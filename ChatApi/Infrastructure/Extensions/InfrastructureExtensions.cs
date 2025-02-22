using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Extensions;

public static class InfrastructureExtensions
{
	public static void AddInfrastructure(this IServiceCollection services)
	{
		services.AddDbContext<AppDbContext>(options =>
		{
			options.UseNpgsql("Server=localhost;Database=Database;Trusted_Connection=True;");
			options.EnableSensitiveDataLogging();
			options.UseAsyncSeeding(async (context, _, _) =>

				await Seeding.SeedAsync(context as AppDbContext ??
				                        throw new InvalidOperationException("Invalid context type")));
		});
	}
}