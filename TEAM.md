# For Team

## Website Colors

yellow => `#FDDB32`  
orange => `#FF690F`  
light-text => `#6A6A6A`  
light-orange => `#FFB534`
light-yellow-with-less-transperency => `rgb(255, 240, 167,13%)`

## Git Notes - for team members

| Description                                                | Command                                    |
| ---------------------------------------------------------- | ------------------------------------------ |
| configure name                                             | `git config --global "[username]"`         |
| configure email                                            | `git config --global "[email address]"`    |
| Initiate an empty repository                               | `git init`                                 |
| Show modified files in working directory,staged for commit | `git status`                               |
| Adding files to staging area                               | `git add .` or `git add [filename]`        |
| Commit your staged content                                 | `git commit -m "[commit message]"`         |
| View commit history                                        | `git log`                                  |
| Restore to a previous commit                               | ` git reset [commit-hash]`                 |
| Temporary Commit(save modified and staged changes)         | `git stash`                                |
| Get stashed files back to staging area                     | `git stash pop`                            |
| Remove stashed files                                       | `git stash clear`                          |
| Adding github repo origin                                  | `git remote add origin [github-repo-link]` |
| Show all the URL's attached                                | `git remote -v`                            |
| Pull repository from github                                | `git pull origin main`                     |

## Some Business Users Login Info

| Business User     | Password       |
| ----------------- | -------------- |
| taj_mahal_mum     | taj_mahal      |
| itc_chola_ch      | itc_chola      |
| oberoi_grand_mum  | oberoi_grand   |
| sheraton_grand_ch | sheraton_grand |
| jw_marriot_ban    | jw_marriot     |

## DB Design

### User Schema

| Field         | DataType          | Constraints      |
| ------------- | ----------------- | ---------------- |
| fullname      | String            | Required         |
| username      | String            | Required, unique |
| email         | String            | Required         |
| phone         | String            | Required         |
| date of Birth | Date              | Required         |
| password      | String(encrypted) | Required         |
| token         | String            |                  |
| role          | String            |                  |

### Hotel Schema

| Field        | DataType         | Constraints                 |
| ------------ | ---------------- | --------------------------- |
| hotelId      | Number           |                             |
| hotelName    | String           | Required                    |
| hotelAddress | String           | Required                    |
| hotelPrice   | Number           | Required                    |
| imageLinks   | Array of Strings | Required                    |
| rating       | Number           |                             |
| flag         | Number           |                             |
| revenue      | Number           | Default: 0                  |
| owner        | ObjectId         | Reference: "User", Required |
| rooms        | Number           | Required                    |
| createdAt    | Date             | Auto-generated              |
| updatedAt    | Date             | Auto-generated              |

### Booking Schema

| Field      | DataType | Constraints                  |
| ---------- | -------- | ---------------------------- |
| user       | ObjectId | Reference: "User", Required  |
| hotel      | ObjectId | Reference: "Hotel", Required |
| checkIn    | Date     | Required                     |
| checkOut   | Date     | Required                     |
| totalPrice | Number   | Required                     |
| status     | String   |                              |

### Review Schema

| Field      | DataType | Constraints                  |
| ---------- | -------- | ---------------------------- |
| user       | ObjectId | Reference: "User", Required  |
| hotel      | ObjectId | Reference: "Hotel", Required |
| reviewText | String   | Required                     |
