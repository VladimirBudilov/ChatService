using Application.Extensions;
using Domain.Services;
using Infrastructure;
using Infrastructure.Extensions;

var builder = WebApplication.CreateSlimBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

app.MapDefaultEndpoints();

await using (var serviceScope = app.Services.CreateAsyncScope()) 
await	using(var context = serviceScope.ServiceProvider.GetRequiredService<AppDbContext>())
{
	await context.Database.EnsureCreatedAsync();
}

var userApi = app.MapGroup("/users");
userApi.MapGet("/", async (IUsersService usersService) => Results.Ok(await usersService.GetAsync()));
// userApi.MapGet("/{id}", (Guid id) => Results.Ok(usersService.GetAsync(id)));

app.Run();
