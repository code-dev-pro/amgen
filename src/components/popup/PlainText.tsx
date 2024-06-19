interface PlainTextProps {
  children: React.ReactNode;
}

export const PlainText = ({ children }: PlainTextProps) => {
  return (
    <div className="w-full h-full max-w-[845px] max-h-[500px] flex items-center justify-center">
      <p className="text-sm ml-4">{children}</p>
    </div>
  );
};
