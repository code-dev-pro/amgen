export const RotateDevice = () => {
  return (
    <div className="fixed inset-0 bg-blue-900 flex flex-col items-center justify-center text-white p-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 animate-spin mb-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>

      <h2 className="text-2xl font-bold mb-2">Oups ! Mode portrait détecté</h2>
      <p className="text-center mb-4">
        Pour une meilleure expérience, veuillez tourner votre appareil en mode paysage.
      </p>
      <div className="w-40 h-40 border-4 border-white rounded-lg transform rotate-90 flex items-center justify-center">
        <div className="w-32 h-20 bg-white rounded"></div>
      </div>
    </div>
  );
};
