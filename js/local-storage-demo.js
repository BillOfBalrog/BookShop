'use strict'

function initBooksData() {
    const books = loadFromStorage(BOOK_DB)

    if (!books || books.length === 0) initBooksCreate()
    else return 

    saveToStorage(BOOK_DB, gBooks)

    renderBooks()
    setBookPricesStats()
}

function initBooksCreate() {
    const books = reset()
    for (var i = 0; i < 10; i++) {
        const randomIdx = Math.floor(Math.random() * books.length)
        const title = bookNames[randomIdx]
        books.splice(randomIdx, 1)[0]
        const price = generateRandomPrice(20, 400)
        addBook(title, price)
    }
}

function reset() {
    const nums = []
    for (var i = 0; i < bookNames.length; i++) {
        nums[i] = i
    }
    return nums
}

const bookNames = [
    "The Hitchhiker's Guide to the Galaxy",
    "Good Omens: The Nice and Accurate Prophecies of Agnes Nutter, Witch",
    "Lamb: The Gospel According to Biff, Christ's Childhood Pal",
    "Dress Your Family in Corduroy and Denim",
    "Let's Pretend This Never Happened: A Mostly True Memoir",
    "How to Avoid Huge Ships",
    "The Lust Lizard of Melancholy Cove",
    "Fifty Shades of Chicken",
    "All My Friends Are Dead",
    "The Hollow Chocolate Bunnies of the Apocalypse",
    "Fifty Shades of Chicken: A Parody in a Cookbook",
    "Go the F**k to Sleep",
    "Pride and Prejudice and Zombies",
    "If You Give a Mouse a Cookie",
    "The Subtle Art of Not Giving a F*ck",
    "All My Friends Are Dead",
    "The Zombie Survival Guide: Complete Protection from the Living Dead",
    "How to Tell If Your Cat Is Plotting to Kill You",
    "The Book with No Pictures",
    "Everything I Need to Know I Learned from a Little Golden Book",
    "The Life-Changing Magic of Tidying Up: The Japanese Art of Decluttering and Organizing",
    "The Hollow Chocolate Bunnies of the Apocalypse",
    "Don't Let the Pigeon Drive the Bus!",
    "Where the Wild Moms Are",
    "I Could Pee on This: And Other Poems by Cats",
    "The Stinky Cheese Man and Other Fairly Stupid Tales",
    "101 Uses for a Dead Cat",
    "The World According to Karl: The Wit and Wisdom of Karl Lagerfeld",
    "Is Everyone Hanging Out Without Me? (And Other Concerns)",
    "The Ultimate Hitchhiker's Guide to the Galaxy",
    "The Zombie Combat Manual: A Guide to Fighting the Living Dead",
    "How to Talk to Your Cat About Gun Safety: And Abstinence, Drugs, Satanism, and Other Dangers That Threaten Their Nine Lives",
    "Stuff White People Like: A Definitive Guide to the Unique Taste of Millions",
    "The Onion Book of Known Knowledge: A Definitive Encyclopaedia Of Existing Information",
    "The Color of Magic",
    "It's Not Easy Being a Bunny",
    "The Girl with the Lower Back Tattoo",
    "Why Cats Paint: A Theory of Feline Aesthetics",
    "The Secret Diary of Adrian Mole, Aged 13¾",
    "The Importance of Being Earnest",
    "Wreck This Journal",
    "Bridget Jones's Diary",
    "The Princess Bride",
    "The No. 1 Ladies' Detective Agency",
    "The Importance of Being Earnest",
    "Are You My Mother?",
    "The Lust Lizard of Melancholy Cove",
    "Dress Your Family in Corduroy and Denim",
    "A Confederacy of Dunces",
    "Let's Pretend This Never Happened: A Mostly True Memoir",
    "The Curious Incident of the Dog in the Night-Time",
    "Good Omens: The Nice and Accurate Prophecies of Agnes Nutter, Witch",
    "The 100-Year-Old Man Who Climbed Out the Window and Disappeared",
    "A Dirty Job",
    "The Hollow Chocolate Bunnies of the Apocalypse",
    "The Salmon of Doubt: Hitchhiking the Galaxy One Last Time",
    "Sh*t My Dad Says",
    "The Zombie Survival Guide: Recorded Attacks",
    "The Importance of Being Earnest",
    "How to Live with a Huge Penis: Advice, Meditations, and Wisdom for Men Who Have Too Much",
    "The Zen of Farting: Teachings from Original Zen Master Reepah Gud Wan",
    "This Book is Full of Spiders: Seriously, Dude, Don't Touch It",
    "Who Moved My Cheese?",
    "Apathy and Other Small Victories",
    "Are You There, Vodka? It's Me, Chelsea",
    "To Say Nothing of the Dog",
    "The Hollow Chocolate Bunnies of the Apocalypse",
    "Zen and the Art of Motorcycle Maintenance: An Inquiry into Values",
    "The Life-Changing Magic of Not Giving a F**k",
    "Lamb: The Gospel According to Biff, Christ's Childhood Pal",
    "The Everything Store: Jeff Bezos and the Age of Amazon",
    "The Zombie Survival Guide: Complete Protection from the Living Dead",
    "The Hitchhiker's Guide to the Galaxy: Quandary Phase",
    "Miss Peregrine's Home for Peculiar Children",
    "The Life-Changing Magic of Tidying Up: The Japanese Art of Decluttering and Organizing",
    "I Am America (And So Can You!)",
    "The Tao of Pooh",
    "The Hollow Chocolate Bunnies of the Apocalypse",
    "Why Do Men Have Nipples? Hundreds of Questions You'd Only Ask a Doctor After Your Third Martini",
    "The Zombies of Lake Woebegotten",
    "Let's Pretend This Never Happened: A Mostly True Memoir",
    "The Sex Lives of Cannibals: Adrift in the Equatorial Pacific",
    "Bossypants",
    "The Curious Incident of the Dog in the Night-Time",
    "The Long Dark Tea-Time of the Soul",
    "I Can Has Cheezburger?: A LOLcat Colleckshun",
    "The Hollow Chocolate Bunnies of the Apocalypse",
    "How to Poo at Work",
    "The Pirate Hunter: The True Story of Captain Kidd",
    "Everything Is F*cked: A Book About Hope",
    "Why Do Men Have Nipples? Hundreds of Questions You'd Only Ask a Doctor After Your Third Martini",
    "The World According to Karl: The Wit and Wisdom of Karl Lagerfeld",
    "The Subtle Art of Not Giving a Duck",
    "How to Lose Friends & Irritate People",
    "Zen and the Art of Fridge Maintenance",
    "50 Shades of Gravy",
    "Eat, Pray, Love, Regret, Diet",
    "The Life-Changing Magic of Tidying Up Your Digital Life",
    "Game of Groans: The Dad Joke Guide to Thrones",
    "Lord of the Fries: Fast Food Folk Tales",
    "The Hitchhiker's Guide to the Galaxy's Worst Restaurants",
    "To Kill a Mockingbird: A Guide to Silencing Your Smart Home Devices",
    "The Lion, The Witch, and the Wardrobe Malfunction",
    "Gone with the Wind: An Amateur Bean Eater's Memoir",
    "The Great Catsby: A Tale of Two Kitties",
    "Tequila Mockingbird: Cocktails with a Literary Twist",
    "Pride and Prejudice and Zombies and More Zombies",
    "Harry Potter and the Chamber of Secrets and Lies",
    "The Girl with the Dragon Tattoo and the Guy with a Barbed Wire Tattoo",
    "The Fault in Our Stars is Nothing Compared to Uranus",
    "The Unbearable Lightness of Being Hungover",
    "Where the Wild Things Are: A Guide to In-Laws",
    "The Princess Diaries: Royal Grudges and Designer Binges",
    "Bridget Jones's Diarrhea",
    "Jurassic Pork: A Prehistoric Cookbook",
    "A Midsummer Night's Dream: Now with More Nightmares",
    "Catch-22 Diseases",
    "The Big Sleep: Overcoming Insomnia Through Overthinking",
    "Moby-Duck: The Whale's Less Impressive Cousin",
    "One Flew Over the Cuckoo's Nest: A Bird-Watching Misadventure",
    "The Picture of Dorian Gray: Before and After Photoshop",
    "Wuthering Heights: A Guide to Yorkshire's Worst Weather"
]