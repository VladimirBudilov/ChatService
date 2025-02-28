using Application.Extensions;
using ChatApi.DTO;
using ChatApi.DTO.Validations;
using Domain.Entities;
using Domain.Services;
using FluentValidation;
using Infrastructure;
using Infrastructure.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData;
using Microsoft.OData.ModelBuilder;

var builder = WebApplication.CreateSlimBuilder(args);

builder.AddServiceDefaults();
builder.Services.AddApplication();

var modelBuilder = new ODataConventionModelBuilder();
modelBuilder.EntitySet<Message>("Messages");
builder.Services.AddValidatorsFromAssemblyContaining<UserDtoValidator>();
builder.Services.AddControllers().AddOData(options =>
{
	options.Select().
		Filter()
		.OrderBy()
		.Expand()
		.Count()
		.SetMaxTop(100)
		.AddRouteComponents("odata", modelBuilder.GetEdmModel());
});

builder.Services.AddCors(options =>
{
	options.AddPolicy("CorsPolicy", b =>
	{
		b.AllowAnyHeader()
			.AllowAnyMethod()
			.AllowAnyOrigin();
	});
});


builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

app.MapDefaultEndpoints();
app.UseRouting();
app.UseCors("CorsPolicy");

await using (var serviceScope = app.Services.CreateAsyncScope())
await using (var context = serviceScope.ServiceProvider.GetRequiredService<AppDbContext>())
{
	await context.Database.EnsureCreatedAsync();
}

app.MapControllers();

var userApi = app.MapGroup("/api/users");
userApi.MapGet("/", async (IUsersService usersService) => Results.Ok(await usersService.GetAsync()));
userApi.MapGet("/{login}",
	async (IUsersService usersService, string login) => Results.Ok(await usersService.GetAsync(login)));
userApi.MapPost("/",
	async (IUsersService usersService, [FromBody] CreateUserRequest createUserRequest,
		IValidator<CreateUserRequest> validator) =>
	{
		var validationResult = await validator.ValidateAsync(createUserRequest);
		if (!validationResult.IsValid)
		{
			return Results.BadRequest(validationResult.Errors);
		}

		var user = await usersService.CreateAsync(createUserRequest.Login);
		return Results.Ok(user.Login);
	});

app.Run();