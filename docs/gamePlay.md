# Game Play

## Basics
- Admins can view all users that login to the website under the admin/users page. 
- Admins can create, view, edit, and destroy commons
    - commons initail params (name, user startig balance, cow price, milk price and start date, end date?)
- Users can join commons
- Users can visit commons they are part of
    - Each user starts the game with their indvidual wealth equal to the commons total wealth
    - Users can buy and sell cows as much as their indvidual wealth allows
        - When cows are bought they have 100 health and this is added to the users averageCowHealth
        - Cows are sold for user averageCowHealth * cowPrice
    - Users cows will be milked daily and they will recieve profit based on how many cows they have and how healthy they are

## Scheduled Events
- At certain times during the day each active commons will fire off certain events that will help to facilite game play
    - Every day at 4am every users cows will be milked and they will recieve a profit added to their individual total wealth
        - individual wealth += milkPrice * (cows * cowHealth)?
    - Every 5 minutes the health of all cows in a commons will be increased or decreased depending on if the commons cows threshold is passed
        - for each user averageCowHeath += (.01(threshold-cows))?
    - Every 10 minutes cows will be killed if a users averageCowHealth is less than a threshold(.3?) 
        - for each user if cowsHealth < threshold(.3?) then 1 in 100 chance a cow in that users commons will die

## Changes Wanted for the game 
- For simplification we moved away from representing each cow indvidually in the data base. As a start we want each user to just have a cow count and a running average cow health. This adds a complication for killing cows that we resolved by having a health threshold. For each user if their average cow helath goes below the threshold then there is a random chance that a cow in that user's farm will be killed. Later on we would like to group cows with similar health so we can track cow health more accuartely and kill cows when they are low or out of health. We would also like to add a report system that will auto generate reports. 
    - Every 10 minutes cows will be killed if they have less than 0 health
        - cow health < 0 then kill
    - Every day at 5am each commons will create a report of commons(total number of cows, average cowHealth) and users(number of cows, averageCowHealth, indvidual wealth) 