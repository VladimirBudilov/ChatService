using Domain.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Extensions;

public static class ApplicationExtensions
{
	public static void AddApplication(this IServiceCollection collection)
	{
		collection.AddScoped<IUsersService, UsersService>();
		collection.AddScoped<IMessageService, MessageService>();
	}
}