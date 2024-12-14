'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

import Navbar from '@/components/navbar';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const formSchema = z.object({
  productName: z.string().min(1, {
    message: 'Productname must be at least 1 characters.',
  }),
  productDescription: z.string().min(1, {
    message: 'Productname must be at least 1 characters.',
  }),
  cta: z.string().min(1, {
    message: 'Productname must be at least 1 characters.',
  }),
});

export default function Home() {
  const [content, setContent] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      cta: 'Welcome Email',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/emails/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setContent(data.emailDraft);
    } catch (error) {
      console.error('Failed to submit request:', error);
    }
  }

  const handleChangeTextArea = (value: string) => {
    setContent(value);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: 'Success',
        description: 'Text copied to clipboard!',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to copy text! ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <Navbar />
      <div className="lg:grid lg:grid-rows-[1fr 3fr] items-center justify-center w-[80%] min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col gap-11 items-center">
          <div className="flex gap-6 grow">
            <h1 className="text-5xl  text-center mr-auto font-semibold lg:text-9xl">
              Craft Smarter Emails Faster with{' '}
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-red-300 to-yellow-200">
                INSTA MAIL
              </span>
            </h1>
          </div>
          <p className="text-1xl w-[70%] text-center lg:text-2xl">
            Looking to write professional, polished emails more efficiently and
            boost response rates?
            <br /> Our free AI-powered email writing tool, trained on
            top-performing email templates, is designed to help you do just
            that. It simplifies the process of automating your email outreach at
            scale.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row w-full justify-around ">
          <div className="p-4 lg:w-1/4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your product name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder=""
                          {...field}
                          className="h-24 lg:min-h-[10rem] leading-tight  resize-none"
                        />
                      </FormControl>
                      <FormDescription>
                        This is your product description.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CTA</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || 'Welcome Email'}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Call to Action of Mail" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Welcome Email">
                              Welcome Email
                            </SelectItem>
                            <SelectItem value="Follow Up Email">
                              Follow Up Email
                            </SelectItem>
                            <SelectItem value="Schedule a call using a calendly link">
                              Schedule a call using a calendly link
                            </SelectItem>
                            <SelectItem value="Reply back with Ideal Time">
                              Reply back with their Ideal Time
                            </SelectItem>
                            <SelectItem value="Reply with feedback">
                              Reply with feedback
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
          <div className="flex flex-col lg:w-2/4 p-4 gap-8">
            <Textarea
              placeholder="Submit Request to see result"
              value={content}
              onChange={(e) => handleChangeTextArea(e.target.value)}
              className="lg:h-full h-56"
            />

            <Button onClick={handleCopy}>Copy To Clipboard</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
