using System.Text.Json.Serialization;
using Application.Extensions;
using Infrastructure;
using Infrastructure.Extensions;

var builder = WebApplication.CreateSlimBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddApplication();
builder.Services.AddInfrastructure();

var app = builder.Build();

app.MapDefaultEndpoints();

await using (var serviceScope = app.Services.CreateAsyncScope()) 
await	using(var context = serviceScope.ServiceProvider.GetRequiredService<AppDbContext>())
{
	await context.Database.EnsureCreatedAsync();
}

var userApi = app.MapGroup("/users");
userApi.MapGet("/", () => new[] { "Alice", "Bob", "Charlie" });
userApi.MapGet("/{id}", (Guid id) => Results.Ok($"Hello, {id}!"));

app.Run();
