var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres");
var postgresdb = postgres.AddDatabase("postgresdb");

var rabbitmq = builder.AddRabbitMQ("messaging");

var realtimeService = builder.AddProject<Projects.RealTimeService>("realtime")
	.WithReference(rabbitmq)
	.WaitFor(rabbitmq);

builder.AddProject<Projects.ChatApi>("chatapi")
	.WithReference(postgres)
	.WithReference(rabbitmq)
	.WithReference(realtimeService)
	.WaitFor(postgres)
	.WaitFor(rabbitmq);

builder.Build().Run();
