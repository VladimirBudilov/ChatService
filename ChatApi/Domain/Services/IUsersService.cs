using Domain.Entities;

namespace Domain.Services;

public interface IUsersService
{
	Task<User> GetAsync(Guid id);
	Task<List<User>> GetAsync();
	Task<User> CreateAsync(User user);
}