using ChatApi.DTO;
using Domain.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace ChatApi.Controllers;

public class MessagesController(AppDbContext context) : ODataController
{
	[HttpGet]
	[EnableQuery]
	public IQueryable<Message> Get()
	{
		return context.Messages;
	}

	[HttpPost]
	public async Task<IActionResult> Post([FromBody] CreateMessageRequest message)
	{
		var newMessage = new Message
		{
			Text = message.Text,
			UserId = message.UserId,
			CreatedAt = DateTime.UtcNow
		};

		await context.Messages.AddAsync(newMessage);
		await context.SaveChangesAsync();

		return Created(newMessage);
	}
}