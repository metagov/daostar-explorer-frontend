import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useRouter } from "next/router";
import { isAddress } from "web3-validator";

import { styled } from "~/styles/stitches.config";

import Box from "~/components/ui/Box";
import Button from "~/components/ui/Button";
import InputLabel from "~/components/ui/InputLabel";
import TextInput from "~/components/ui/TextInput";

type Props = {
  onSubmit?: () => void;
};

const Row = styled(Box, {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  gap: "$16",
});

const Container = styled(Box, {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "$4",
});

export default function AddressSearch({ onSubmit }: Props) {
  const router = useRouter();
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string | null>();

  const setAddressFromInput = (event: ChangeEvent<HTMLInputElement>) =>
    setAddress(event.target.value);

  const submitAddress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error && event.key.length === 1) setError(null);
    if (event.key !== "Enter") return null;

    submit();
  };

  const submit = () => {
    if (!isAddress(address)) {
      setError("Invalid address");
      return null;
    }

    if (onSubmit) onSubmit();

    router.push(`/${address}`);
  };

  return (
    <Container>
      <Row>
        <TextInput
          placeholder="Search any address..."
          onChange={setAddressFromInput}
          onKeyUp={submitAddress}
          error={!!error}
        />
        <Button onClick={submit}>Search</Button>
      </Row>
      <Row>
        <InputLabel error={!!error}>{error}</InputLabel>
      </Row>
    </Container>
  );
}
