import { sanitize } from '../../utils/helpers';

interface PlainTextProps {
  text: string;
}

export const PlainText = ({ text }: PlainTextProps) => {
  return (
    <div className="w-full max-w-[845px] h-[500px] flex items-center justify-center text-black">
      <p className="text-sm ml-4" dangerouslySetInnerHTML={sanitize(text)} />
    </div>
  );
};
