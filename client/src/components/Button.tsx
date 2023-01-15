import { createComponent } from '../utils/createComponent';

type Params = Parameters<typeof getButtonClasses>;
type Variants = Params[0];

type Props = {
  label: string;
  variant: Variants;
  type: 'button' | 'submit';
  onClick?: () => void;
};

const getButtonClasses = createComponent({
  default: 'border border-default text-default uppercase hover:bg-gray-800/80 ',
  primary: 'bg-red-500 uppercase hover:bg-red-500/80 ',
  green: 'bg-green-500 uppercase hover:bg-green-500/80 ',
});

const Button = ({ type = 'button', variant, label, onClick }: Props) => {
  const classes = getButtonClasses(
    variant,
    'block w-full rounded-lg focus:outline-none p-2 text-lg transform active:scale-90 transition-transform'
  );
  return (
    <button
      type={type}
      className={classes}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {label}
    </button>
  );
};

export default Button;
