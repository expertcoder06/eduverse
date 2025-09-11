import Image from 'next/image';
import * as React from 'react';

export function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="Pro Learning Logo"
      width={48}
      height={48}
      className="text-primary"
    />
  );
}
