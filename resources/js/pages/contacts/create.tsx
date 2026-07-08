import { Head, Link } from '@inertiajs/react';
import ContactController from '@/actions/App/Http/Controllers/ContactController';
import { ContactForm } from '@/components/contacts/contact-form';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { create, index } from '@/routes/contacts';

export default function ContactsCreate() {
    return (
        <>
            <Head title="Add contact" />

            <div className="flex flex-1 flex-col gap-6 p-4 pb-8 md:max-w-2xl md:p-6">
                <div className="flex items-start justify-between gap-4">
                    <Heading
                        variant="small"
                        title="Add contact"
                        description="Create a new financial relationship"
                    />
                    <Button variant="outline" asChild>
                        <Link href={index()}>Back</Link>
                    </Button>
                </div>

                <ContactForm
                    form={ContactController.store.form()}
                    submitLabel="Create contact"
                />
            </div>
        </>
    );
}

ContactsCreate.layout = {
    breadcrumbs: [
        {
            title: 'Contacts',
            href: index(),
        },
        {
            title: 'Add contact',
            href: create(),
        },
    ],
};
