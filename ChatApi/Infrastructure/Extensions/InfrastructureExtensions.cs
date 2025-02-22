using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Extensions;

public static class InfrastructureExtensions
{
	public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
	{
		services.AddDbContext<AppDbContext>(options =>
		{
			options.UseNpgsql(configuration.GetConnectionString("postgres"));
			options.EnableSensitiveDataLogging();
			options.UseAsyncSeeding(async (context, _, _) =>

				await Seeding.SeedAsync(context as AppDbContext ??
				                        throw new InvalidOperationException("Invalid context type")));
		});
	}
}