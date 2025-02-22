using Domain.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Extensions;

public static class ApplicationExtensions
{
	public static void AddApplication(this IServiceCollection collection)
	{
		collection.AddTransient<IUsersService, UsersService>();
		collection.AddTransient<IMessageService, MessageService>();
	}
}