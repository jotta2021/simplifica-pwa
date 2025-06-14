import { Button } from "./button"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
export const ContainerPage = ({children}:{children:React.ReactNode}) => {
    return (
        <div className='p-4 px-6 w-full'>
            {children}
        </div>
    )
}


export const ContainerPageHeader = ({children}:{children:React.ReactNode}) => {
    return (
        <div className='w-full flex items-center justify-between max-md:flex-col max-md:items-start'>
            {children}
        </div>
    )
}

export const ContentHeader = ({children}:{children:React.ReactNode}) => {
    return (
        <div className=''>
            {children}
        </div>
    )
}
export const BreadcrumbP = ({ items }: { items: { label: string; href?: string; isCurrentPage?: boolean }[] }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <BreadcrumbItem key={index}>
                        {item.isCurrentPage ? (
                            <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        ) : (
                            <BreadcrumbLink href={item.href || '#'}>{item.label}</BreadcrumbLink>
                        )}
                        {index < items.length - 1 && <BreadcrumbSeparator />}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
export const TitlePage = ({title}:{title:string}) => {
    return (
        <h1 className='text-2xl font-bold text-gray-700'>{title}</h1>
    )
}

export const DescriptionPage = ({description}:{description:string}) => {
    return (
        <p className='text-sm text-gray-500'>{description}</p>
    )
}

export const PageActions = ({children}:{children:React.ReactNode}) => {
    return (
        <div className=''>
            {children}
        </div>
    )
}

export const ButtonPage = ({children,onClick}:{children:React.ReactNode,onClick:()=>void}) => {
    return (
        <Button className='bg-green-500 hover:bg-green-600 text-white' onClick={onClick}>{children}</Button>
    )
}

export const ContentPage = ({children}:{children:React.ReactNode}) => {
    return (
        <div className='w-full flex flex-col gap-2 my-4'>
            {children}
        </div>
    )
}