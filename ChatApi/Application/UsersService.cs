using Domain.Entities;
using Domain.Services;
using Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Application;

public class UsersService(AppDbContext context) : IUsersService
{
	public async Task<User> GetAsync(Guid id)
	{
		return (await context.Users.FirstOrDefaultAsync(x => x.Id == id))!;
	}

	public async Task<List<User>> GetAsync()
	{
		return await context.Users.ToListAsync();
	}

	public async Task<User> CreateAsync(User user)
	{
		await context.Users.AddAsync(user);
		await context.SaveChangesAsync();
		return user;
	}
}