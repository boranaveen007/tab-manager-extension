Tab Manager - Chrome Extension 🚀

A simple and efficient Chrome Extension to help users manage their browser tabs effortlessly. Whether you have too many tabs open, want to group them, close duplicates, or save sessions, this extension makes it all quick and easy.

🔗 GitHub Repository: git@github.com:boranaveen007/tab-manager-extension.git

⸻

🌟 Features

✅ Search Tabs - Quickly find open tabs by name
✅ Group Tabs by Domain - Organize similar tabs automatically
✅ Close All Tabs - Instantly clear your workspace
✅ Save & Restore Sessions - Save your current tabs and reload them later
✅ Remove Duplicate Tabs - Closes all duplicate tabs in one click
✅ Pin/Unpin Tabs - Keep important tabs pinned
✅ Suspend Inactive Tabs - Free up memory by suspending unused tabs
✅ Mute/Unmute All Tabs - Instantly mute all audio-playing tabs
✅ Dark Mode - Switch between light and dark themes

⸻

🔧 Installation & Setup

Step 1: Clone the Repository
git clone https://github.com/your-username/tab-manager-extension.git
cd tab-manager-extension

Step 2: Install Dependencies
This extension uses TailwindCSS for styling. If you want to modify the styles, install dependencies:
npm install

Step 3: Build TailwindCSS
Run the following command to generate the CSS:
npx tailwindcss -i ./src/tailwind.css -o ./output.css --watch

Step 4: Load the Extension in Chrome
	1.	Open Google Chrome
	2.	Go to chrome://extensions/
	3.	Enable Developer Mode (toggle in the top right)
	4.	Click Load Unpacked and select the tab-manager-extension folder
	5.	The extension will be added to Chrome! 🎉

⸻

📌 How to Use

🔍 Searching Tabs
	1.	Click the extension icon in your Chrome toolbar
	2.	Use the search box to quickly find a tab
	3.	Click a result to jump to that tab

🗂️ Managing Tabs
	•	Group Tabs by Domain - Click the button to auto-group tabs
	•	Close All Tabs - Instantly close all open tabs
	•	Remove Duplicate Tabs - Closes duplicate tabs automatically
	•	Pin/Unpin Tabs - Organizes important tabs with a single click

💾 Saving & Restoring Sessions
	•	Click Save Session to store your current tabs
	•	Click Restore Session to reload saved tabs

🎵 Controlling Audio & Performance
	•	Mute/Unmute All Tabs - Instantly mute/unmute noisy tabs
	•	Suspend Inactive Tabs - Frees memory by pausing unused tabs

🌙 Dark Mode
	•	Click Toggle Dark Mode to switch themes

⸻

🛠️ Built With
	•	JavaScript (Chrome API)
	•	HTML, CSS (TailwindCSS for UI)
	•	Chrome Storage API (for session persistence)

⸻

📜 License

This project is open-source under the MIT License. Feel free to modify and enhance it!

If you find this useful, give it a ⭐ on GitHub and share your feedback! 🚀
