var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres");
var postgresdb = postgres.AddDatabase("postgresdb");

builder.AddProject<Projects.ChatApi>("chatapi")
	.WithReference(postgres);

builder.Build().Run();
