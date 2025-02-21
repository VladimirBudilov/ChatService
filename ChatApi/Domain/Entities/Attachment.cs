using Domain.Enums;

namespace Domain.Entities;

public class Attachment : BaseEntity
{
	public AttachmentType Type { get; set; }
}