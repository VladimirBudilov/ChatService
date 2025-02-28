using Domain.Entities;

namespace Domain.Services;

public interface IMessageService
{
	Task CreateAsync(Message message);
}