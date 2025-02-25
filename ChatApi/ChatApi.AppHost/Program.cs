var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres");
var postgresdb = postgres.AddDatabase("postgresdb");

builder.AddProject<Projects.ChatApi>("chatapi")
	.WithReference(postgres)
	.WaitFor(postgres);

builder.Build().Run();
