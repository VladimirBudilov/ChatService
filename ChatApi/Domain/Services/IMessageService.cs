using Domain.Entities;

namespace Domain.Services;

public interface IMessageService
{
	Task<List<Message>> GetAsync();
	Task<Message> CreateAsync(Message message);
}