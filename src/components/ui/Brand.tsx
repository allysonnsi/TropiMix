import Image from "next/image";
import Link from "next/link";
export default function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand">
      <Image src="/images/logo01.png" alt="" width={52} height={52} priority />
      <span>
        Tropi<span className="brand-accent">Mix</span>
        {!compact && <small>Sabor feito na hora</small>}
      </span>
    </Link>
  );
}
