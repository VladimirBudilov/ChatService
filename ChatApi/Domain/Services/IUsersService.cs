using Domain.Entities;

namespace Domain.Services;

public interface IUsersService
{
	Task<User?> GetAsync(string login);
	Task<List<User>> GetAsync();
	Task<User> CreateAsync(string? login);
}