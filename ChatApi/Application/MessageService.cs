using Contracts.Contracts;
using Domain.Entities;
using Domain.Services;
using Infrastructure;
using MassTransit;

namespace Application;

public class MessageService(IPublishEndpoint endpoint, AppDbContext context) : IMessageService
{
	public async Task CreateAsync(Message message)
	{
		var transaction = await context.Database.BeginTransactionAsync();

		try
		{
			await context.Messages.AddAsync(message);
			await context.SaveChangesAsync();
			await endpoint.Publish<MessageCreated>(
				new MessageCreated(message.Text!, message.UserId,
				message.CreatedAt));

			await transaction.CommitAsync();
		}
		catch (Exception e)
		{
			await transaction.RollbackAsync();
			throw;
		}
	}
}