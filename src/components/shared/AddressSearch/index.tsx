import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useRouter } from "next/router";

import { styled } from "~/styles/stitches.config";

import Box from "~/components/ui/Box";
import Button from "~/components/ui/Button";
import TextInput from "~/components/ui/TextInput";

const Container = styled(Box, {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  gap: "16px",
});

export default function AddressSearch() {
  const router = useRouter();
  const [address, setAddress] = useState<string>("");

  const setAddressFromInput = (event: ChangeEvent<HTMLInputElement>) =>
    setAddress(event.target.value);

  const submitAddress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return null;

    submit();
  };

  // TODO: check for errors
  const submit = () => router.push(`/${address}`);

  return (
    <Container>
      <TextInput
        placeholder="Search any address..."
        onChange={setAddressFromInput}
        onKeyUp={submitAddress}
      />
      <Button onClick={submit}>Search</Button>
    </Container>
  );
}
