using Microsoft.AspNetCore.SignalR;
using RealTimeService.Dto;

namespace RealTimeService.Hubs;

public class MessageNotifier(IHubContext<MessageHub, IMessageHubClient> hubContext) : IMessageNotifier
{
	public async Task NotifyMessageAsync(Message message)
	{
		await hubContext.Clients.All.ReceiveMessage(message);
	}
}

public interface IMessageNotifier
{
	Task NotifyMessageAsync(Message message);
}