using ChatApi.DTO;
using Domain.Entities;
using Domain.Services;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace ChatApi.Controllers;

public class MessagesController(AppDbContext context, IMessageService service) : ODataController
{
	[HttpGet]
	[EnableQuery]
	public IQueryable<Message> Get()
	{
		return context.Messages;
	}

	[HttpPost]
	public async Task<IActionResult> Post([FromBody] CreateMessageRequest request)
	{
		var message = new Message
		{
			Text = request.Text,
			UserId = request.UserId,
			CreatedAt = DateTime.UtcNow
		};
		
		await service.CreateAsync(message);
		return NoContent();
	}
}