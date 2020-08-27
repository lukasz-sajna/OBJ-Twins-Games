using System;
using System.ComponentModel.DataAnnotations;

namespace Obj.Twins.Games.Statistics.Persistence.Models
{
    public class Entity
    {
        [Key]
        public Guid Id { get; private set; }

        public Entity()
        {
            Id = Guid.NewGuid();
        }
    }
}
