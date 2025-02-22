using Domain.Entities;
using Domain.Services;

namespace Application;

public class MessageService : IMessageService
{
	public Task<List<Message>> GetAsync()
	{
		throw new NotImplementedException();
	}

	public Task<Message> CreateAsync(Message message)
	{
		throw new NotImplementedException();
	}
}