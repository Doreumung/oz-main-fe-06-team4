import { cva } from 'class-variance-authority';

export const inputWrapperStyles = cva('flex flex-col w-96 text-sm', {
  variants: {
    variant: {
      default: 'gap-1',
      signin: '',
      title: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const inputStyles = cva(
  'w-full p-4 border border-green rounded-2xl text-darkerGray focus:outline-green',
  {
    variants: {
      variant: {
        default: 'h-11',
        signin: 'h-16 pt-6 pb-2',
        title:
          'h-11 border-darkGray bg-fadedGreen text-darkerGray placeholder-lightGray focus:outline-darkGray',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const passwordStyle = cva('absolute right-5 bg-white text-lightGray hover:text-darkGray', {
  variants: {
    variant: {
      default: 'top-1/2 -translate-1/2',
      signin: 'bottom-5',
      title: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
