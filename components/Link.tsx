import Link, { LinkProps } from 'next/link';

const CustomLink: React.FC<LinkProps> = ({ href, ...rest }) => {
    const localHref = href.toString();
    const isInternalLink = localHref && localHref.startsWith('/');
    const isAnchorLink = localHref && localHref.startsWith('#');

    if (isInternalLink) {
        return (
            <Link href={href} scroll={false}>
                <a {...rest} />
            </Link>
        );
    }

    if (isAnchorLink) {
        return <a href={localHref} {...rest} />;
    }

    return <a target="_blank" rel="noopener noreferrer" href={localHref} {...rest} />;
};

export default CustomLink;
