## Data Structure (DTO Required?)
- No DTO Architecture for MVP1, Not required for current overall scope.
- Note*: when you start chopping up the architecture of your own project, when you find yourself in a jam with awkward logic, circular imports, or frustrating dependencies, remember this post. Give yourself permission to take a step back and rip it all apart again, this time with the benefit of what your incremental improvements have taught you.


## File Structure (Similar to MVP pattern)
- Routes (HTTP)
   ↓
- Service (business logic)
   ↓
- ORM Models (persistence)
   ↓
- DTO Mapper (representation)
   ↓
- Routes (response)

Note: 
- ORM models should describe “what exists.”
- DTOs describe “what we show.”


## API Documentation on POSTMAN
- [API Documentation](https://crimson-crater-369452.postman.co/workspace/DMAssistant~c0f8892a-9df2-4845-96da-5fecc1f2e6af/request/38627500-2601e8d2-0845-4967-a2cc-200ab4ebce2d?action=share&creator=38627500&ctx=documentation&active-environment=38627500-0b4d24f9-9259-40a9-aa43-4964cf8c1026)
- Postman Request-Response Examples: 
![alt text](image.png)

   - Response:
```{
  "campaign": {
    "id": "uuid-string",
    "title": "Divinity",
    "description": "What would you do if you were a god and rule over the world?"
  }
}```