import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Deepanshu Patel</h3>
            <ul className="flex md:block justify-between flex-wrap">
              <li>
                <a
                  href="https://deepanshupatel.netlify.app"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  About Me
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="flex md:block justify-between flex-wrap">
              <li>
                <a
                  href="https://twitter.com/PatelDeepanshu_"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Twitter
                </a>
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/in/deepanshu-patel-1444b327a"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  target="_blank"
                >
                  Linkedin
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} DEEPANSHU PATEL. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
