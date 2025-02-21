var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.ChatApi>("chatapi");
/*builder.Add*/

builder.Build().Run();
