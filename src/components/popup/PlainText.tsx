interface PlainTextProps {
  text: string;
}

export const PlainText = ({ text }: PlainTextProps) => {
  return (
    <div className="w-full h-full max-w-[845px] max-h-[500px] flex items-center justify-center text-black">
      <p className="text-sm ml-4">{text}</p>
    </div>
  );
};
