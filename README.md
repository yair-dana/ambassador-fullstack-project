# ambassador-fullstack

Comments application
using Ambassador and RPC

For test locally


---Fetch Comments---

Positive: provide site id "site-valid"

Negative: provide site id "site-invalid"


---Add Comment--- 

Positive: provide site id "site-valid", author "test" text "test"

Negative: provie site id "site-invalid", author "test" text "test"


------- Issues  ------- 
1. I didn't make an E2E test
2. I didn't refactor the client api calls.
