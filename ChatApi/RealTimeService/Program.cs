using MassTransit;
using RealTimeService.Consumers;
using RealTimeService.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddCors(options =>
{
	options.AddDefaultPolicy(b =>
	{
		b.WithOrigins("http://localhost:4200")
			.AllowAnyMethod()
			.AllowAnyHeader()
			.AllowCredentials();
	});
});

builder.Services.AddOpenApi();
builder.Services.AddSignalR();
builder.Services.AddMassTransit(x =>
{
	x.SetKebabCaseEndpointNameFormatter();
	x.AddConsumer<MessageCreatedConsumer>();
	x.UsingRabbitMq((context, cfg) =>
	{
		cfg.Host(builder.Configuration.GetConnectionString("messaging"));

		cfg.ConfigureEndpoints(context);
	});
});
var app = builder.Build();

app.MapDefaultEndpoints();

if (app.Environment.IsDevelopment())
{
	app.MapOpenApi();
}

app.UseCors();
app.MapHub<MessageHub>("/message-hub");

app.Run();