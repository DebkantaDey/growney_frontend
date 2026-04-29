export default function ReferEarn(){
  const avatars = [
    "https://media.istockphoto.com/id/544358212/photo/happy-laughing-man.jpg?s=612x612&w=is&k=20&c=TeWwYilpBKQqFFbpN3U1t6e7lCSTvKCdrYyAtx54AbM=",
    "https://media.istockphoto.com/id/483627817/photo/showing-off-his-pearly-whites.jpg?s=612x612&w=is&k=20&c=vNKvDw8pwFarp_lcB62hGpYB8RVtjfPGZAsXPKuKIqA=",
    "https://media.istockphoto.com/id/1424275574/photo/portrait-of-happy-man-smiling-in-camera.jpg?s=612x612&w=0&k=20&c=GerKsA5OQi5sNrKtrxUtv4uhSTjLp0U17sbEeYuwghM=",
    "https://media.istockphoto.com/id/1042466214/photo/young-surprised-man-isolated-on-gray-background-in-blue-t-shirt-looking-at-camera-with-open.jpg?s=612x612&w=0&k=20&c=jNKpnMGNZPGs1_0bisHKm5RSXUtQbgmaBYMCLFC37WM=",
  ];

  const referralLink = "https://metafy.gg/referral/ghQdsqe2in/johndoe";

  // Function to copy the referral link to the clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };
  
  // Functions to share on social media
  const handleShare = (platform) => {
    const encodedLink = encodeURIComponent(referralLink);

    let shareUrl = "";
    if (platform === "email") {
      shareUrl = `mailto:?subject=Check this out!&body=Here is my referral link: ${referralLink}`;
    } else if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?text=Check this out!&url=${encodedLink}`;
    } else if (platform === "messenger") {
      shareUrl = `https://www.facebook.com/dialog/send?link=${encodedLink}&app_id=YOUR_FACEBOOK_APP_ID&redirect_uri=${encodedLink}`;
    }

    window.open(shareUrl, "_blank");
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md">
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">16</h2>
          <p className="text-gray-500">REFERRALS</p>
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">$160</h2>
          <p className="text-gray-500">CREDITS EARNED</p>
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">8</h2>
          <p className="text-gray-500">REWARDS</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Refer and Earn!
        </h2>
        <p className="text-gray-500">
          Get 50 point for every friend you refer!, share your friends the
          experience of learning from world's best!
        </p>
      </div>

      <div className="bg-green-100 rounded-lg p-4 shadow-md">
        <div className="flex -space-x-4 pb-6">
          {avatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className="w-12 h-12 rounded-lg border-2 border-white shadow-lg"
            />
          ))}
        </div>

        <div className="flex items-center ">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
          <p className="text-gray-800">Invite a friend to Metafy</p>
        </div>

        <div className="h-10 w-[2px] bg-black ml-1.5" />

        <div className="flex items-center ">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
          <p className="text-gray-800">
            That friend spends $10 or more booking their first lesson
          </p>
        </div>
        <div className="h-10 w-[2px] bg-black ml-1.5" />
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full border border-gray-400 mr-2" />
          <p className="text-gray-800">You earn 50 point!</p>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto p-4">
        {/* Referral Link Input */}
        <div className="flex items-center mb-4 border border-gray-300 rounded-lg overflow-hidden ">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 text-white bg-gray-800 hover:bg-gray-700 focus:outline-none"
          >
            Copy
          </button>
        </div>

        {/* Share Buttons */}
        <div className="mb-2">
          <p>Share via socail media</p>
        </div>
        <div className="flex justify-between space-x-10">
          <button
            onClick={() => handleShare("email")}
            className="flex-1 py-2 text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none"
          >
            Email
          </button>
          <button
            onClick={() => handleShare("twitter")}
            className="flex-1 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none"
          >
            Twitter
          </button>
          <button
            onClick={() => handleShare("messenger")}
            className="flex-1 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Messenger
          </button>
        </div>
      </div>
    </div>
  );
}
