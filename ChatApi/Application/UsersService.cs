using Domain.Entities;
using Domain.Services;

namespace Application;

public class UsersService : IUsersService
{
	public Task<User> GetAsync(Guid id)
	{
		throw new NotImplementedException();
	}

	public Task<List<User>> GetAsync()
	{
		throw new NotImplementedException();
	}

	public Task<User> CreateAsync(User user)
	{
		throw new NotImplementedException();
	}
}