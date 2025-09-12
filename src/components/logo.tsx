import Image from 'next/image';
import * as React from 'react';

export function Logo() {
  return (
    <Image
      src="https://picsum.photos/seed/plogo/48/48"
      alt="Pro Learning Logo"
      width={48}
      height={48}
      className="text-primary rounded-md"
    />
  );
}
