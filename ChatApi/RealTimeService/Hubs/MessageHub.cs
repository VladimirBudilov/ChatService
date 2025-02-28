using Microsoft.AspNetCore.SignalR;
using RealTimeService.Dto;

namespace RealTimeService.Hubs;

public class MessageHub : Hub<IMessageHubClient>
{
	public async Task SendMessageToClients(Message message)
	{
		await Clients.All.ReceiveMessage(message);
	}
}

public interface IMessageHubClient
{
	Task ReceiveMessage(Message message);
}