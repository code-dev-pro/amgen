import { useQuizDataStore } from '../stores/dataStore';

export const Footer = () => {
  const { quizData } = useQuizDataStore();
  return (
    <div className="absolute bottom-0 left-0 w-full h-[63px]">
      <div className="absolute inset-0 bg-footer-dark-blue opacity-80"></div>
      <div className="relative flex items-center justify-between h-full ml-8">
        <p className="text-xs">
          Ce document contient des informations sur des produits en cours de développement.
          <br />
          SC-FR-CP-0053125 - Août 2024 - Version: {quizData?.version}
        </p>
        <svg className="w-[105px] mr-8" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 282.2 69.7">
          <g>
            <path d="M171.7,23.6c-3.4-4.7-8-7.5-14.2-7.5-10.4,0-18.9,8.6-18.9,19.1s8.5,19.1,18.9,19.1c7.5,0,14-4.4,17.1-10.9h-19.4v-15.6h35.6V3.5h31.8v15.6h-16.6s-.1,8.6,0,8.6h16.6v15.6h-16.6v8.1h16.6v15.2c.5,0-31.8,0-31.8,0v-23.1c-3.8,17.3-17.6,26.2-33.2,26.2s-28.3-9.1-32-25.3v22.4h-15.6V29.8s-9,8-9,36.9h-16c0-29-9-36.9-9-36.9v36.9h-15.9V2.5c18,0,29.9,20.2,32.7,32.2h0c2.8-11.9,14.7-32.2,32.7-32.2v21.3h0c3-14.2,17.3-23.8,32-23.8s28.5,11.4,31.3,23.5h-17.1v.1Z" />
            <path d="M256.8,66.7c-2.3-17.4-13.9-29.9-13.9-29.9v29.9h-16.6V3.5c3.7,0,16.9,7.1,30.4,26.6V3.5h16.2v63.2h-16.1Z" />
            <path d="M40.7,66.8h15.7V2.4c-14.8-1.4-22.9,4.7-27,7.9-8.9,6.7-14.4,16.7-18.7,25.8C6.4,45.2,2.1,58.9,0,66.9h16.2c1.1-4.5,3.9-14.2,4.3-16h13v-14.7h-6.4c3.3-4.9,8.6-11.4,13.7-14.9v14.9h-7.8v14.7h7.7s0,15.9,0,15.9Z" />
          </g>
          <path d="M282.2,5.2c0,1.7-1.4,3.1-3.1,3.1s-3.1-1.4-3.1-3.1,1.4-3.1,3.1-3.1c1.7,0,3.1,1.4,3.1,3.1ZM276.4,5.2c0,1.5,1.2,2.7,2.7,2.7s2.6-1.2,2.6-2.7-1.2-2.7-2.6-2.7c-1.5,0-2.7,1.2-2.7,2.7ZM280.6,6.9h-.5l-1-1.6h-.8v1.6h-.4v-3.5h1.5c.3,0,.6,0,.8.2.3.1.4.5.4.8,0,.7-.5.9-1.1,1l1.1,1.5ZM279,5c.5,0,1.2.1,1.2-.6,0-.5-.5-.6-.9-.6h-1v1.2s.7,0,.7,0Z" />
        </svg>
      </div>
    </div>
  );
};
