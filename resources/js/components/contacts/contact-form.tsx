import { Form } from '@inertiajs/react';
import type { FormComponentSlotProps } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Contact } from '@/types/contact';

type ContactFormProps = {
    form: {
        action: string;
        method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    };
    contact?: Contact;
    submitLabel: string;
};

export function ContactForm({ form, contact, submitLabel }: ContactFormProps) {
    const tagsValue = contact?.tags?.length ? contact.tags.join(', ') : '';

    return (
        <Form
            {...form}
            options={{
                preserveScroll: true,
            }}
            className="space-y-6"
        >
            {({ processing, errors }: FormComponentSlotProps) => (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="full_name">Full name</Label>
                        <Input
                            id="full_name"
                            name="full_name"
                            defaultValue={contact?.fullName ?? ''}
                            required
                            autoComplete="name"
                            placeholder="Full name"
                        />
                        <InputError message={errors.full_name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="nickname">Nickname</Label>
                        <Input
                            id="nickname"
                            name="nickname"
                            defaultValue={contact?.nickname ?? ''}
                            placeholder="Nickname"
                        />
                        <InputError message={errors.nickname} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            defaultValue={contact?.phone ?? ''}
                            required
                            autoComplete="tel"
                            placeholder="09XXXXXXXXX"
                        />
                        <InputError message={errors.phone} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                            id="address"
                            name="address"
                            defaultValue={contact?.address ?? ''}
                            required
                            placeholder="Address"
                            rows={3}
                        />
                        <InputError message={errors.address} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="relationship">Relationship</Label>
                        <Input
                            id="relationship"
                            name="relationship"
                            defaultValue={contact?.relationship ?? ''}
                            required
                            placeholder="Friend, Family, Colleague..."
                        />
                        <InputError message={errors.relationship} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="facebook">Facebook</Label>
                        <Input
                            id="facebook"
                            name="facebook"
                            defaultValue={contact?.facebook ?? ''}
                            required
                            placeholder="Facebook profile or username"
                        />
                        <InputError message={errors.facebook} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="birthday">Birthday</Label>
                        <Input
                            id="birthday"
                            name="birthday"
                            type="date"
                            defaultValue={contact?.birthday ?? ''}
                        />
                        <InputError message={errors.birthday} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="tags">Tags</Label>
                        <Input
                            id="tags"
                            name="tags"
                            defaultValue={tagsValue}
                            placeholder="VIP, Payday, GCash"
                        />
                        <p className="text-sm text-muted-foreground">
                            Separate tags with commas.
                        </p>
                        <InputError message={errors.tags} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                            id="notes"
                            name="notes"
                            defaultValue={contact?.notes ?? ''}
                            placeholder="Additional notes about this contact"
                            rows={4}
                        />
                        <InputError message={errors.notes} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : submitLabel}
                        </Button>
                    </div>
                </>
            )}
        </Form>
    );
}
