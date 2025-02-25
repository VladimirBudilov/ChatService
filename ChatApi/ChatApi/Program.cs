using Application.Extensions;
using Domain.Services;
using Infrastructure;
using Infrastructure.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData;

var builder = WebApplication.CreateSlimBuilder(args);

builder.AddServiceDefaults();
builder.Services.AddApplication();
builder.Services.AddControllers().AddOData(options =>
{
	options.Select().Filter().OrderBy().Expand().Count().SetMaxTop(100);
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
app.UseCors("CorsPolicy");

await using (var serviceScope = app.Services.CreateAsyncScope())
await using (var context = serviceScope.ServiceProvider.GetRequiredService<AppDbContext>())
{
	await context.Database.EnsureCreatedAsync();
}

app.MapControllers();

var userApi = app.MapGroup("/users");
userApi.MapGet("/", async (IUsersService usersService) => Results.Ok(await usersService.GetAsync()));
userApi.MapGet("/{login}",
	async (IUsersService usersService, string login) => { return Results.Ok(await usersService.GetAsync(login)); });
userApi.MapPost("/", async (IUsersService usersService, [FromBody] UserDto userDto) =>
{
	var user = await usersService.CreateAsync(userDto.Login);
	return Results.Ok(user.Login);
});

app.Run();

public record UserDto(string Login);