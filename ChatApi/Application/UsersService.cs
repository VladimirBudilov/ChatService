using Domain.Entities;
using Domain.Services;
using Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Application;

public class UsersService(AppDbContext context) : IUsersService
{
	public async Task<User?> GetAsync(string login)
	{
		return (await context.Users.FirstOrDefaultAsync(x => x.Login == login));
	}

	public async Task<List<User>> GetAsync()
	{
		return await context.Users.ToListAsync();
	}

	public async Task<User> CreateAsync(string? login)
	{
		var user = await context.Users.FirstOrDefaultAsync(x => x.Login == login) ?? new User
			{ Login = login ?? $"anonimus{Guid.NewGuid().ToString()[..5]}" };
		await context.Users.AddAsync(user);
		await context.SaveChangesAsync();
		return user;
	}
}