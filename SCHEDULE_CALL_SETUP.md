# Google Calendar Meeting — Schedule Call Button Setup

"Schedule Call" ko Google Calendar ka booking page dikhane ke liye ye steps follow karo:

## Step 1: Google Calendar Appointment Schedule banao

1. [calendar.google.com](https://calendar.google.com) par jao  
2. Right side par **"Create"** dropdown se **"Appointment schedule"** select karo  
3. **Title** dalo (e.g. "15-min Call with Gopal")  
4. **Duration** set karo (15 min, 30 min, etc.)  
5. **Availability** set karo (kab kab available ho)  
6. **Save** karo  

## Step 2: Share link copy karo

1. Apne appointment schedule par click karo  
2. **"Share"** ya **"Copy link"** pe click karo  
3. Link kuch aisa hoga:  
   `https://calendar.google.com/calendar/appointments/schedules/XXXXXXX`

## Step 3: Link data.json mein add karo

`src/components/data/data.json` file open karo aur `scheduleCall` mein ye link paste karo:

```json
"scheduleCall": "https://calendar.google.com/calendar/appointments/schedules/YOUR_ID_HERE"
```

Ab **Schedule Call** button click karne par Google Calendar ka booking page open hoga, jahan visitors apna slot choose kar sakte hain aur Google Meet link auto-generate hoga.
