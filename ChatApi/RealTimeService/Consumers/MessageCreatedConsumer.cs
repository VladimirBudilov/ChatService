using Contracts.Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using RealTimeService.Dto;
using RealTimeService.Hubs;

namespace RealTimeService.Consumers;

public class MessageCreatedConsumer(IHubContext<MessageHub, IMessageHubClient> hubContext, ILogger<MessageCreatedConsumer> logger) : IConsumer<MessageCreated>
{
	public async Task Consume(ConsumeContext<MessageCreated> context)
	{
		logger.LogInformation("Message created");
		var message = context.Message;
		var dtoMessage = new Message(Guid.NewGuid(), message.Text, message.CreatedAt, message.UserId);
		await hubContext.Clients.All.ReceiveMessage(dtoMessage);

	}
}